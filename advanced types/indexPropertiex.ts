interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  1: 'Not a valid email!',
  username: 'Must start with a capital character!'
};
