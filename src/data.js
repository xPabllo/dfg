export const initialData = {
  cards: {
    'card-1': { id: 'card-1', content: 'Take out the garbage' },
    'card-2': { id: 'card-2', content: 'Watch my favorite show' },
    'card-3': { id: 'card-3', content: 'Charge my phone' },
    'card-4': { id: 'card-4', content: 'Cook dinner' },
  },
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'To do',
      cards: ['card-1', 'card-2', 'card-3', 'card-4'],
    },
    'list-2': {
      id: 'list-2',
      title: 'In progress',
      cards: [],
    },
    'list-3': {
      id: 'list-3',
      title: 'Done',
      cards: [],
    },
  },
  listOrder: ['list-1', 'list-2', 'list-3'],
};
