import { CalculatorService } from "./calculator.service";

import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  let calculatorService: CalculatorService, loggerSpy: any;
  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });
    calculatorService = TestBed.inject(CalculatorService);
  });

  it("should add two numbers", () => {
    const result = calculatorService.add(5, 3);

    expect(result).toBe(8);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const result = calculatorService.subtract(5, 3);

    expect(result).toBe(2);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
