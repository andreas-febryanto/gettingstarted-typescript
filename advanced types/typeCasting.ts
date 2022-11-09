// const userInputElement = <HTMLInputElement>(
//   document.getElementById('user-input')
// );
const userInputElement = document.getElementById(
  'user-input'
)! as HTMLInputElement;
// exclamation -> never yield null
userInputElement.value = 'Hi there!';
if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi There!';
}
