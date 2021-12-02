module.exports = {
    parserOptions: {
        sourceType: "module"
    },
    env: {
        browser: true,
        es6:true
    },
    extends: ['eslint-config-tui', 'prettier'], // 뒤에 선언된 규칙이 우선순위가 높다.
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": "error",
    }
}