# Shark Stewards

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

🦈 Next.js-based web application to help track Shark sightings across California in association with https://sharkstewards.org/.

## Building and Running the App

### 1. Install Dependencies

After cloning the repostitory, in the root folder:

```bash
$ npm install
```

### 2. Define an ENV file

Create a file `.env.local` at the root of the repo. The ENV file must contain at the following vars:

```
SUPABASE_API_KEY=...
SUPABASE_URL=...
```

(Bring your own Supabase instance or reach out to the developers for access.)

### Run locally

You can now start the frontend server by running the `dev` NPM script at the root of the repo:

```bash
$ npm run dev
```

With the server running, visit `http://localhost:3000` in your browser to use the app. The app will hot reload as you save changes to the code.

## License

This project is licensed under the MIT license.

## Contributing

Contributions are welcome! Please feel free to open Issues or Pull Requests.

Tag any of the following contributors for assistance:

- [codejonesw](https://github.com/codejonesw/). William Jones.
- [ronaldsmartin](https://github.com/ronaldsmartin). Ronald Martin.
- [moonrise-tk](https://github.com/moonrise-tk/). Tanishq Kancharla.

## Questions

If you have any questions about the repo, open an issue or contact us directly at sharkstewarddev@gmail.com.
