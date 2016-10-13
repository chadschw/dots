
export class MathUtil {
    static RandBetween(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    } 

    static RandBetweenInt(min: number, max: number) {
        return Math.floor(MathUtil.RandBetween(min, max));
    }
}