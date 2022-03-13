# Kanban Board

[![thumbnail-kanban-low-resolution](https://tva1.sinaimg.cn/large/e6c9d24egy1h07yud7uwdj21qe0qqwfm.jpg)](https://codeisneverodd.github.io/practice-with-react-typescript-for-kanban-board/)

## Table of Contents

- [Languages](#languages)
- [Frameworks & Libraries](#frameworks--libraries)
- [Design Tools](#design-tools)
- [Guides](#guides)
    - [Make Skeleton Site](#make-skeleton-site)
        - [Result of Skeleton](#result-of-skeleton)

    - [Color the skeletons](#color-the-skeletons)
        - [Result of Coloring](#result-of-coloring)

    - [Deploy](#deploy)
        - [Result of Deployment](#result-of-deployment)

## Click & Check Result

[![kanban-logo_160x160](https://tva1.sinaimg.cn/large/e6c9d24egy1h07zbwp8ugj204g04gjr9.jpg)](https://codeisneverodd.github.io/practice-with-react-typescript-for-kanban-board/)

## Languages

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black)](https://en.wikipedia.org/wiki/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)](https://en.wikipedia.org/wiki/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)](https://en.wikipedia.org/wiki/CSS)

## Frameworks & Libraries

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)](https://reactjs.org/)
[![Recoil](https://img.shields.io/badge/Recoil-3578e5?style=for-the-badge&logo=ApexCharts.js&logoColor=white)](https://recoiljs.org/)

## Notable Packages

[![react-beautiful-dnd](https://img.shields.io/badge/react_beautiful_dnd-4c90f7?style=for-the-badge&logo=react_beautiful_dnd&logoColor=white)](https://github.com/atlassian/react-beautiful-dnd)
[![styledcomponents](https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)
[![ReactHelmet](https://img.shields.io/badge/ReactHelmet-2FBCD9?style=for-the-badge&logo=ApexCharts.js&logoColor=white)](https://www.npmjs.com/package/react-helmet)

## Design Tools

[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white)](https://www.figma.com/)

## Guides

### Make Skeleton Site

1. Initialize project using Create React App, `npx create-react-app my-app --template typescript`.
1. Delete useless files and erase all uselsess codes in them. In my case, delete all the files except `App.tsx`
   and `index.tsx`.
1. Create a directory called `models`.
1. Create `atoms.ts` file in `models` directory and define global states.
1. Install react-router-dom via npm, `npm i react-router-dom`.
1. Install react-beautiful-dnd via npm, `npm i react-beautiful-dnd`.
1. Create a directory called `routes`.
1. Create `Home.tsx` file in `routes` directory and define `DragDropContext` and `Droppable` for `type={"boards"}`.
1. Create `Router.tsx` file in root directory and define route for `Home.tsx`.
1. Create a directory called `components`.
1. Create `Board.tsx`, `Task.tsx`, `TaskTrashCan.tsx` and  `AddBoard.tsx` in `components` directory.
1. Define `Board ` component as `Draggable`  in `Boards.tsx` and add `Droppable`  for tasks inside.
1. Define `AddBoard` and `Task` component as `Draggable`  in `AddBoard.tsx` and  `Task.tsx` .
1. Define `TaskTrashCan ` component as `Droppable`  in `TaskTrashCan.tsx` .
1. Add `TaskTrashCan` below `DragDropContext` opening tag.
1. Add `Board`  and `AddBoard` in the `Droppable` area of `type={"boards"}` in `Home`.
1. Add `Task` in the `Droppable` area of default type in `Board`.
1. Place all the parameters which are needed for drag and drop actions.
1. Define function `onDragEnd` in `Home` and add logics for listing.
1. Create `localStorage.ts` file in `models` directory and define functions for saving data in local storage.
1. Add local storage saving logic in `Home`
1. Add a button in the `Board` and define onClick event for deleting board. Done.

#### Result of Skeleton

> Please dont' care about the coloring things in this stage, just define components and drag&drop actions.

![skeleton-of-kanban](https://tva1.sinaimg.cn/large/e6c9d24egy1h0817lx13bj21600ra0ui.jpg)

### Color the skeletons

1. Design it with design tools or something, in my case Figma.

![component-group](https://tva1.sinaimg.cn/large/e6c9d24egy1h08267n4ilj210f08l754.jpg)

![Home-Dark-Action](https://tva1.sinaimg.cn/large/e6c9d24egy1h0822xazxzj21600rat9m.jpg)

![Home-Dark-NoAction](https://tva1.sinaimg.cn/large/e6c9d24egy1h0822w5qqxj21600radgi.jpg)

2. Visit [Google Fonts](https://fonts.google.com/) and select the fonts you want to use. Copy the `<link>` to embed.
3. Install react-helmet via npm,  `npm install --save react-helmet`.
4. Add `Helmet` component above `Router` component and embed the link that we copied in step 2.
5. Install styled-compents via npm,  `npm install --save styled-components`.
6. Create a directory called `styles`.
7. Remove default settings in CSS. You can do this in various ways. In my case, define `createGlobalStyle` in  `App.tsx`
   and paste the code of [this](https://meyerweb.com/eric/tools/css/reset/).
8. Make `styled.d.ts` file in `styles` folder and declare module `'styled-components'` and add interface `DefaultTheme`.
9. Make `theme.ts` file in `styles` folder and define colors in themes using `DefaultTheme`  you want to use. In my
   case, I defined `darkTheme` and `lightTheme` .
10. Make `global.d.ts` file in `src` folder and declare modules to use image files.
11. Show off your CSS skills! Make styled components in the files you need. If you have to make a identical styled
    components in different files, make `styles.tsx` file in `styles` folder, put them there, and import them where you
    need.

#### Result of Coloring

> Please don't just copy my design or codes. That doesn't help you at all.
![kanban-gif-1](https://user-images.githubusercontent.com/54318460/158059935-1b70e0de-5435-4117-b7be-1c3025e1b140.gif)
![kanban-gif-2](https://user-images.githubusercontent.com/54318460/158059940-c62d4529-26d5-4a58-81c2-29eef201e7ba.gif)

### Deploy

1. You can deploy your website in various ways. In my case, I deployed by publishing files to `gh-pages` branch on
   GitHub.

2. Make Repository on GitHub and push all the files.

3. Install gh-pages via npm,  `npm install gh-pages --save-dev`.

4. Go to `package.json`  and add `"homepage"`  right above the last curly brace.
   Use `https://user-id-here.github.io/repository-name-here`

1. ```json
      },
        "homepage": "https://codeisneverodd.github.io/practice-with-react-typescript-for-crypto-dictionary/"
      }
      ```

5. Add `"deploy"` and `"predeploy"` to `script` in `package.json`.

1. ```json
      "scripts": {
          "deploy": "gh-pages -d build",
          "predeploy": "npm run build"
        },
      ```

6. Finish deployment by entering `npm run deploy` in the console.

#### Result of Deployment

<img width="1904" alt="스크린샷 2022-03-13 오후 9 46 25" src="https://user-images.githubusercontent.com/54318460/158060257-fcc8f9ba-add0-4661-8bc8-241c51b70d23.png">

<img width="1904" alt="스크린샷 2022-03-13 오후 9 52 58" src="https://user-images.githubusercontent.com/54318460/158060259-5a87eca3-f84d-4282-bfaf-714e75fc6567.png">


