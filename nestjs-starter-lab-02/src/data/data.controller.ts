import {
  Controller,
  Get,
  Sse,
  MessageEvent,
  StreamableFile,
  NotFoundException,
} from '@nestjs/common';
import { createReadStream, existsSync, statSync } from 'fs';
import { resolve } from 'path';
import { Observable } from 'rxjs';

@Controller('data')
export class DataController {
  @Get('stream')
  getCsv(): StreamableFile {
    const filePath = resolve(process.cwd(), 'assets', 'large-dataset.csv'); // ajusta la ruta
    if (!existsSync(filePath)) {
      throw new NotFoundException('CSV no encontrado');
    }

    const file = createReadStream(filePath);
    const { size } = statSync(filePath);

    // StreamableFile permite pasar headers
    return new StreamableFile(file, {
      type: 'text/csv; charset=utf-8',
      disposition: 'inline; filename="large-dataset.csv"',
      length: size,
    });
  }
  @Sse('observable-stream')
  csvSse(): Observable<MessageEvent> {
    const filePath = resolve(process.cwd(), 'assets', 'large-dataset.csv');
    if (!existsSync(filePath)) {
      throw new NotFoundException('CSV no encontrado');
    }

    const stream = createReadStream(filePath, { encoding: 'utf8' });

    return new Observable<MessageEvent>((subscriber) => {
      stream.on('data', (chunk) => {
        subscriber.next({ data: chunk }); // cada chunk = un evento SSE
      });
      stream.on('end', () => subscriber.complete());
      stream.on('error', (err) => subscriber.error(err));

      // cleanup si el cliente se desconecta o se completa
      return () => stream.destroy();
    });
  }
}
