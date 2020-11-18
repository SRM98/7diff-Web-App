import * as fs from "fs";
import * as imagePath from "path";
import {FreeGame, Game, SimpleGame} from "../../common/communication/game";
import {PathError} from "../../common/error";

export class Converter {

    public  imgToBase64(name: string, buffer: Buffer): string {
        try {
            if (buffer.length !== 0) {
                const base64Image: string = Buffer.from(buffer).toString("base64");

                return `data:image/bmp;base64,${base64Image}`;
            } else {
            const str: Buffer = fs.readFileSync(name);

            const extensionName: string = imagePath.extname(name);

            const base64Image: string = Buffer.from(str).toString("base64");

            return `data:image/${extensionName.split(".").pop()};base64,${base64Image}`;
            }

        } catch (e) {
            return name;
        }

    }

    public convertThumbnailsToBase64(games: Game[]): void {
        for (const game of games) {
            this.convertThumbnailToBase64(game);
        }
    }

    public convertThumbnailToBase64(game: Game): void {
        const buff: Buffer = Buffer.from("");
        game.thumbnail = this.imgToBase64(game.thumbnail, buff);
    }

    public convertSimpleGameToBase64(game: SimpleGame): void {
        const buff: Buffer = Buffer.from("");
        game.originalImg = this.imgToBase64(game.originalImg, buff);
        game.modifiedImg = this.imgToBase64(game.modifiedImg, buff);
        game.modifiedGameImg = this.imgToBase64(game.modifiedGameImg, buff);
    }

    public convertSimpleGameFromBase64(game: SimpleGame): void {
        game.originalImg = this.base64toImage(game, game.originalImg, "./originalImages/");
        game.modifiedImg = this.base64toImage(game, game.modifiedImg, "./modifiedImages/");
        game.modifiedGameImg = this.base64toImage(game, game.modifiedGameImg, "./modifiedImages/");
        game.thumbnail = game.originalImg;
    }

    private base64toImage(game: Game, image: string, path: string): string {
        // tslint:disable-next-line:no-any
        const base64ToImage: any = require("base64-to-image");
        const base64Str: string = image;
        // tslint:disable-next-line:typedef
        const optionalObj = {"fileName": game.name + game.id, "type": "bmp"};
        base64ToImage(base64Str, path, optionalObj);

        return path + game.name + game.id + ".bmp";
    }

    private cropThumbnail(thumbnailPath: string): void {
        // tslint:disable-next-line:typedef
        const jimp = require("jimp");
        // tslint:disable-next-line:no-any
        jimp.read(thumbnailPath, (err: PathError, thumbnail: any) => {
            try {
                thumbnail
                    // tslint:disable-next-line:no-magic-numbers
                    .crop(0, 0, thumbnail.bitmap.width / 2, thumbnail.bitmap.height)
                    // tslint:disable-next-line:no-magic-numbers
                    .resize(thumbnail.bitmap.width / 2, thumbnail.bitmap.height / 2)
                    .write(thumbnailPath);
            } catch (err) {
                this.cropThumbnail(thumbnailPath);
            }
        }).then();
    }

    public convertFreeGameFromBase64(game: FreeGame): void {
        game.thumbnail = this.base64toImage(game, game.thumbnail, "./originalImages/");
        this.cropThumbnail(game.thumbnail);
    }

    public deleteImage(id: number, name: string): void {
        fs.unlink("./modifiedImages/" + name + id + ".bmp", (err: PathError) =>  {console.error("File was not found"); });
        fs.unlink("./originalImages/" + name + id + ".bmp", (err: PathError) =>  {console.error("File was not found"); });
    }

}
