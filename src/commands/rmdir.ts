import { Arg, Command, Env } from "./lib/command.js";
import { stdout } from "process";
import { getDevice } from "./util.js";


let cmd = new Command("Delete a directory on device", {
    action: async (options: Record<string, string | boolean>, args: Record<string, string>, env: Env) => {
        let port = options["port"] as string;
        let baudrate = options["baudrate"] as string;
        let socket = options["socket"] as string;
        let path = args["path"] as string;

        let device = await getDevice(port, baudrate, socket, env);

        await device.controller.lock().catch((err) => {
            stdout.write("Error locking device: " + err);
            throw 1;
        });

        let cmd = await device.uploader.deleteDirectory(path).catch((err) => {
            stdout.write("Error: " + err + "\n");
            throw 1;
        });

        await device.controller.unlock().catch((err) => {
            stdout.write("Error unlocking device: " + err);
            throw 1;
        });

        stdout.write(cmd.toString() + "\n");
    },
    args: [
        new Arg("path", "Directory to delete", { required: true }),
    ],
    chainable: true
});

export default cmd;
