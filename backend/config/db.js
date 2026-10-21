import mongoose from "mongoose"
import dns from 'dns'

dns.setServers(["8.8.8.8", "0.0.0.0"])

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        console.log(`MongoDB Connected`)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB