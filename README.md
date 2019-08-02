# BagTrack &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/greysonn/BagTrack/blob/master/LICENSE)
BagTrack allows you to add all of your sales and immediately see your profit/loss

## Author

[Greyson](https://github.com/greysonn)

## Screenshots
![1](https://i.imgur.com/bKOCEw6.png)
![2](https://i.imgur.com/CGIHstW.png)

### Installation

#### Requirements
[Node.js (LTS Version)](http://nodejs.org/).
[Typescript](https://www.typescriptlang.org/#download-links).

For now, you can only run in the development typescript environment until production is ready. At that point, binaries can be found [here](https://github.com/greysonn/BagTrack/releases).

Setup:

```sh
git clone https://github.com/greysonn/BagTrack.git
cd BagTrack
npm install # "sudo npm install" if you're on macOS or Linux
```

Run After Setup:

```sh
npm run prod
npm start
```


## Todo List
- [ ] Finish settings page.
- [X] Add actions to each sale
- [ ] Compile production built executables for mac/windows
- [ ] Add support for currencies other than USD.
- [ ] Ability to link to stockx/goat to auto-import sales
