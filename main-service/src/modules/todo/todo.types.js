import { Types, Document } from "mongoose";
export var Priority;
(function (Priority) {
    Priority["Low"] = "low";
    Priority["Medium"] = "medium";
    Priority["High"] = "high";
})(Priority || (Priority = {}));
export var Status;
(function (Status) {
    Status["All"] = "all";
    Status["Active"] = "active";
    Status["Completed"] = "completed";
})(Status || (Status = {}));
export var SortBy;
(function (SortBy) {
    SortBy["CreatedAt"] = "createdAt";
    SortBy["DueDate"] = "dueDate";
    SortBy["Priority"] = "priority";
})(SortBy || (SortBy = {}));
export var SortOrder;
(function (SortOrder) {
    SortOrder["Asc"] = "asc";
    SortOrder["Desc"] = "desc";
})(SortOrder || (SortOrder = {}));
//# sourceMappingURL=todo.types.js.map