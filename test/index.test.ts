import 'mocha';
import {load} from "../src/load";
import {expect} from "chai";

describe("DotEnv", function () {
    it('.env`', function () {
        load();
        expect(process.env['a']).to.equal('a');
        expect(process.env['b']).to.equal('b');
        expect(process.env['c']).to.equal('d');
        expect(process.env['test1']).to.equal('123');
        expect(process.env['32b']).to.equal('octal');
        expect(process.env['32b']).to.equal('octal');
        expect(process.env['test2']).to.equal('');
        expect(process.env['test3']).to.equal('test4');
    });

    it('.env.development`', function () {
        load({env: 'development'});
        expect(process.env['dev']).to.equal('development');
        expect(process.env['da']).to.equal('b');
        expect(process.env['db']).to.equal('c');
    });

    it('.env.production`', function () {
        load({env: 'production'});
        expect(process.env['prod']).to.equal('production');
        expect(process.env['pa']).to.equal('1');
        expect(process.env['pb']).to.equal('2');
    });

    it('.env.testing`', function () {
        load({env: 'testing'});
        expect(process.env['test']).to.equal('testing');
        expect(process.env['tb']).to.equal('1');
        expect(process.env['tc']).to.equal('2');
    });

    it('.env.staging`', function () {
        load({env: 'staging'});
        expect(process.env['stage']).to.equal('staging');
        expect(process.env['sh']).to.equal('123');
        expect(process.env['s123']).to.equal('h');
    });
});