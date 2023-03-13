import { Arg, Command } from "./lib/command.js";
import { stdout } from "process";
import { getDevice } from "./util.js";


let cmd = new Command("Upload a file/directory to device", {
    action: async (options: Record<string, string | boolean>, args: Record<string, string>) => {
        let port = options["port"] as string;
        let baudrate = options["baudrate"] as string;
        let socket = options["socket"] as string;
        let from = args["from"] as string;
        let to = args["to"] as string;

        let device = await getDevice(port, baudrate, socket);

        let cmd = await device.uploader.upload(from, to).catch((err) => {
            stdout.write("Error: " + err + "\n");
            process.exit(1);
        });

        stdout.write(cmd.toString() + "\n");
    },
    args: [
        new Arg("from", "File to upload", { required: true }),
        new Arg("to", "Remote file to upload to", { required: true }),
    ]
});

export default cmd;
