# Screenshot Exact Match

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1ec64590-c1fd-47c1-b177-537bb898477a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

This project includes an `.npmrc` compatibility setting for npm's peer-dependency resolver. If npm has already cached a failed install, run `npm cache verify` once and then repeat `npm install`.

### Concierge

The concierge uses a deterministic rule-based model in `src/routes/api.chat.ts`. It does not call Lovable, OpenAI, Python, or any other AI service. Update the intent rules and grounded responses in that file when hotel information changes.
