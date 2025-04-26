import { ApiEndpoint } from '../types/api';

export const apiEndpoints: ApiEndpoint[] = [
  {
    id: 'instagram',
    name: 'Instagram Info',
    description: 'Get Instagram profile information',
    url: '/api/instagram',
    paramName: 'username',
    paramPlaceholder: 'Enter Instagram username',
    icon: 'instagram',
  },
  // ... other endpoints ...
]; 