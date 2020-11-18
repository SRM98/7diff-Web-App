import { TestBed } from "@angular/core/testing";
import { ChronoService } from "./chrono.service";

// tslint:disable-next-line:only-arrow-functions typedef
async function delay(ms: number) {
  return new Promise( (resolve) => setTimeout(resolve, ms) );
}

// tslint:disable:no-floating-promises
describe("ChronoService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("Chrono Service should be created", () => {
    const service: ChronoService = TestBed.get(ChronoService);
    expect(service).toBeTruthy();
  });

  describe("Displaying the right format of time", () => {

  it("updateTimerDisplay should make display = 10:10 when given minutes = 10 and seconds = 10", () => {
    const service: ChronoService = TestBed.get(ChronoService);
    // tslint:disable-next-line:no-magic-numbers
    service.minutes = 10;
    // tslint:disable-next-line:no-magic-numbers
    service.seconds = 10;
    service.updateTimerDisplay();
    expect(service.display).toEqual("10:10");
  });

  it("updateTimerDisplay should make display = 09:10 when given minutes = 9 and seconds = 10", () => {
    const service: ChronoService = TestBed.get(ChronoService);
    // tslint:disable-next-line:no-magic-numbers
    service.minutes = 9;
    // tslint:disable-next-line:no-magic-numbers
    service.seconds = 10;
    service.updateTimerDisplay();
    expect(service.display).toEqual("09:10");
  });

  it("updateTimerDisplay should make display = 10:09 when given minutes = 10 and seconds = 09", () => {
    const service: ChronoService = TestBed.get(ChronoService);
    // tslint:disable-next-line:no-magic-numbers
    service.minutes = 10;
    // tslint:disable-next-line:no-magic-numbers
    service.seconds = 9;
    service.updateTimerDisplay();
    expect(service.display).toEqual("10:09");
  });

  it("updateTimerDisplay should make display = 09:09 when given minutes = 9 and seconds = 9", () => {
    const service: ChronoService = TestBed.get(ChronoService);
    // tslint:disable-next-line:no-magic-numbers
    service.minutes = 9;
    // tslint:disable-next-line:no-magic-numbers
    service.seconds = 9;
    service.updateTimerDisplay();
    expect(service.display).toEqual("09:09");
  });

  it("startTimer should make display 1:00 when given seconds = 59 and minutes = 0", async () => {
    const service: ChronoService = TestBed.get(ChronoService);
    // tslint:disable-next-line:no-magic-numbers
    spyOn(service, "resetTimer").and.returnValues(service.minutes = 0, service.seconds = 59);
    service.startTimer();
    // tslint:disable-next-line:no-magic-numbers
    await delay(1000);
    expect(service.seconds).toEqual(0);
    expect(service.minutes).toEqual(1);
    expect(service.display).toEqual("01:00");
  });

  it("resetTimer should reset seconds and minutes to 0 and put display to 00:00", async () => {
    const service: ChronoService = TestBed.get(ChronoService);
    service.startTimer();
    // tslint:disable-next-line:no-magic-numbers
    await delay(1000);
    service.resetTimer();
    expect(service.seconds).toEqual(0);
    expect(service.minutes).toEqual(0);
    expect(service.display).toEqual("00:00");
  });
  it("getTime should return 70 when minutes = 1 and seconds = 10", async () => {
    const service: ChronoService = TestBed.get(ChronoService);
    service.minutes = 1;
    // tslint:disable-next-line:no-magic-numbers
    service.seconds = 10;
    // tslint:disable-next-line:no-magic-numbers
    expect(service.getTime()).toEqual(70);
  });
});

  describe("Timer starts and stop tests", () => {

  it("startTimer should start the timer and modify the display accordingly", async () => {
    const service: ChronoService = TestBed.get(ChronoService);
    service.startTimer();
    // tslint:disable-next-line:no-magic-numbers
    await delay(1000);
    expect(service.seconds).toEqual(1);
    expect(service.minutes).toEqual(0);
    expect(service.display).toEqual("00:01");
  });
  it("stoptimer should not change minutes/seconds/display after it's been called", async () => {
    const service: ChronoService = TestBed.get(ChronoService);
    service.startTimer();
    // tslint:disable-next-line:no-magic-numbers
    await delay(1000);
    service.stopTimer();
    // tslint:disable-next-line:no-magic-numbers
    await delay(1000);
    expect(service.seconds).toEqual(1);
    expect(service.minutes).toEqual(0);
    expect(service.display).toEqual("00:01");
  });

  it("getTimeDisplay should return display attribute", async () => {
    const service: ChronoService = TestBed.get(ChronoService);
    service.display = "1:00";
    expect(service.getTimeDisplay()).toEqual("1:00");
  });
});

});
