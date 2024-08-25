import connect from "../configs/mongoConnection";
import app from "./app";
const PORT = process.env.PORT || 3000;

connect(() => console.log("connected to DB"));
app.listen(PORT, () => console.log("server is running on port " + PORT));