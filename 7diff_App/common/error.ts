export class SubmitError extends Error {
    constructor(message: any) {
      super(message);
      this.name = "SubmitError";
    }
}


export class BootStrapError extends Error {
    constructor(message: any) {
      super(message);
      this.name = "BootStrapError";
    }
}


export class PathError extends Error {
    constructor(message: any) {
      super(message);
      this.name = "PathError";
    }
}

export class DimensionsError extends Error {
    constructor(message: any) {
      super(message);
      this.name = "DimensionsError";
    }
}

export class UsernameError extends Error {
  constructor(message: any) {
    super(message);
    this.name = "UsernameError";
  }
}
