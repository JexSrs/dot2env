import * as path from "node:path";
import * as fs from "node:fs";

type Options = {
    env: string;
    envMap: { [env: string]: string };
    override: boolean;
    encoding: BufferEncoding;
}

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg

function parse(src: string): object {
    const obj: any = {};

    // Convert line breaks to same format
    const lines = src.replace(/\r\n?/mg, '\n')

    let match;
    while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = (match[2] || '').trim();

        // Check if double-quoted
        const maybeQuote = value[0];

        // Remove surrounding quotes
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2');

        // Expand newlines if double-quoted
        if (maybeQuote === '"')
            value = value.replace(/\\n/g, '\n')
                .replace(/\\r/g, '\r')

        obj[key] = value
    }

    return obj
}

export function load(opts?: Partial<Options>) {
    opts ??= {};
    opts.env ??= process.env.NODE_ENV;
    opts.envMap ??= {
        dev: '.env.development', development: '.env.development',
        test: '.env.testing', testing: '.env.testing',
        stage: '.env.staging', staging: '.env.staging',
        prod: '.env.production', production: '.env.production'
    };
    opts.override ??= false;
    opts.encoding ??= 'utf-8';

    const filepath = path.resolve(process.cwd(), opts.envMap[opts.env?.toLowerCase() ?? ''] ?? '.env');
    let filedata = fs.readFileSync(filepath, opts.encoding);
    let parsed: any = parse(filedata);

    Object.keys(parsed).forEach(key => {
        if (process.env[key] === undefined || opts!.override)
            process.env[key] = parsed[key];
    });
}

