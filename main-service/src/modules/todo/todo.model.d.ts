import { type ITodoDocument } from "./index.js";
export declare const Todo: import("mongoose").Model<ITodoDocument, {}, {}, {}, import("mongoose").Document<unknown, {}, ITodoDocument, {}, import("mongoose").DefaultSchemaOptions> & ITodoDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITodoDocument>;
//# sourceMappingURL=todo.model.d.ts.map