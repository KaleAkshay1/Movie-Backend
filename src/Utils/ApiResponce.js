class ApiResponce {
  constructor(status = 200, data = [], message = "Success", success = true) {
    (this.status = status),
      (this.data = data),
      (this.message = message),
      (this.success = success);
  }
}

export default ApiResponce;
