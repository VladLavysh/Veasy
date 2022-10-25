import app from "./server"
import keys from "./keys"
import { dbConnect } from "./db_connect"

//dbConnect() // Connecting to MongoDB database

app.listen(keys.PORT, () => console.log(`Server listening at http://localhost:${keys.PORT}...`))
