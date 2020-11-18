import * as fs from "fs";
import { injectable } from "inversify";

@injectable()
export class SoundService {

    private readonly CORRECT_SOUND_PATH: string = "./originalImages/Correct-answer.mp3";
    private readonly INCORRECT_SOUND_PATH: string = "./originalImages/Wrong-answer-sound-effect.mp3";

    public sound(isSoundCorrect: boolean): string {

        let str: Buffer = Buffer.from("");
        try {

            isSoundCorrect ? str = fs.readFileSync(this.CORRECT_SOUND_PATH) : str = fs.readFileSync(this.INCORRECT_SOUND_PATH);

            const base64Image: string = Buffer.from(str).toString("base64");
            fs.writeFileSync("../tests4", base64Image);

            return `data:audio/mp3;base64,${base64Image}`;

        } catch (e) {
            return "Erreur";
        }

    }

}
