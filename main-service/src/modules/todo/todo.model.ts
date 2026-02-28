import { model, Schema, SchemaTypes } from "mongoose";
import { Priority, type ITodoDocument } from "./index.js";

const todoSchema = new Schema<ITodoDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: Object.values(Priority),
      default: Priority.Medium,
    },
    dueDate: {
      type: Date,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

todoSchema.index({ userId: 1, completed: 1 });

todoSchema.index({ userId: 1, priority: 1 });

todoSchema.index({ title: "text" });

export const Todo = model<ITodoDocument>("Todo", todoSchema);
