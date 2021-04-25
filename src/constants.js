// const base_url = "http://api.covidresource.me";

export default class Constants {
  url = {
    base_url: "http://api.covidresource.me"
  }

  constructor() {
    this.url = { ...this.url };
  }
}