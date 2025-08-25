interface ExternalUser {
  id: number;
  name: string;
  email: string;
}

export class ExternalUserDataService {
  async fetchUsers(): Promise<ExternalUser[]> {
    // Simulate an HTTP call to an external service
    return Promise.resolve([
      { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
      { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com' },
      { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com' },
      { id: 4, name: 'Diana Prince', email: 'diana.prince@example.com' },
      { id: 5, name: 'Ethan Hunt', email: 'ethan.hunt@example.com' },
      { id: 6, name: 'Fiona Gallagher', email: 'fiona.gallagher@example.com' },
      { id: 7, name: 'George Miller', email: 'george.miller@example.com' },
      { id: 8, name: 'Hannah Lee', email: 'hannah.lee@example.com' },
      { id: 9, name: 'Ian Curtis', email: 'ian.curtis@example.com' },
      { id: 10, name: 'Julia Roberts', email: 'julia.roberts@example.com' },
      { id: 11, name: 'Kevin Bacon', email: 'kevin.bacon@example.com' },
      { id: 12, name: 'Laura Palmer', email: 'laura.palmer@example.com' },
      { id: 13, name: 'Mike Tyson', email: 'mike.tyson@example.com' },
      { id: 14, name: 'Nina Simone', email: 'nina.simone@example.com' },
      { id: 15, name: 'Oscar Wilde', email: 'oscar.wilde@example.com' },
      { id: 16, name: 'Paula Abdul', email: 'paula.abdul@example.com' },
      {
        id: 17,
        name: 'Quentin Tarantino',
        email: 'quentin.tarantino@example.com',
      },
      { id: 18, name: 'Rachel Green', email: 'rachel.green@example.com' },
      { id: 19, name: 'Steve Jobs', email: 'steve.jobs@example.com' },
      { id: 20, name: 'Tina Fey', email: 'tina.fey@example.com' },
    ]);
  }
}
