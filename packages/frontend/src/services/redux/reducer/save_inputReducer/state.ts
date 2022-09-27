export default interface ISave_inputState {
  input_username: string;
  input_password: string;
  input_email: string;
  input_gender: "male" | "female" | "other";
  input_file: any;
  notification_number: number;
}
