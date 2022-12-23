// Класс, предоставляющий физические формулы и значения.
// Значения задаются относительно Солнца, если не указано иное.
export class StarAstronomy {
  // Скорость света
  public static readonly c = 299_792_458;

  private static readonly secsInYear = 60 * 60 * 24 * 365;
  private static toYears(secs: number) {
    return secs / StarAstronomy.secsInYear;
  }
  private static toSeconds(years: number) {
    return years * StarAstronomy.secsInYear;
  }

  public static sunMass() {
    return 1.9891 * Math.pow(10, 30);
  }
  public static sunLuminocity() {
    return 3.827 * Math.pow(10, 26);
  }
  public static sunLifeTime() {
    return StarAstronomy.toSeconds(Math.pow(10, 10));
  }
  public static sunDiameter() {
    return 1.39 * Math.pow(10, 9);
  }

  public static luminocity(m: number) {
    let k: number = 0;
    let a: number = 0;
    // Если задавать m в абсолютном значении
    // const sunM: number = StarAstronomy.sunMass();
    const sunM: number = 1;
    if (m < 0.43 * sunM) {
      k = 0.23;
      a = 23;
    } else if (m < 2 * sunM) {
      k = 1;
      a = 4;
    } else if (m < 20 * sunM) {
      k = 1.5;
      a = 3.5;
    } else if (m >= 20 * sunM) {
      k = 3200;
      a = 1;
    } else {
      // Todo:
      // Иначе формула не должна работать
      throw new Error("Incorrect mass parameter");
    }

    const res = k * Math.pow(m / sunM, a); // * StarAstronomy.sunLuminocity();
    return res;
  }

  public static lifeTime(m: number, L: number) {
    const secs = (StarAstronomy.c * StarAstronomy.c * m) / L;
    return StarAstronomy.toYears(secs);
  }

  public static lifeTime1(m: number) {
    return Math.pow(m, -2.5);
  }

  public static diameter(m: number) {
    return Math.pow(m, 0.74);
  }
}
