# DEV HANDBOOK

## Folder Structure

- @types: to contain global type definitions
- app: to contain pages.
  - student: student related pages
  - tutor: tutor related pages
  - auth: authentication related pages
  - _Note_: keep pages tsx simple by placing the bulk tsx content inside the containers folder.
- common: custom hooks, utils and HOCs
- components: UI components to be used globally, such as buttons, inputs, modals, drawers, headers, footers, etc.
- configs: configurations, such as environmental variables
- containers: the tsx body content for each page. Each container should optionally have a subfolder `components' to contain container specific UI components. Extract UI elements into individual components when the code is getting too bulky to ensure maintainability and readability.
- redux: redux related logic.
  - apis: services to request backend.
  - reducers and slices: manages in-app states.

## Libraries

- Development Language: [Typescript](https://www.typescriptlang.org/docs/handbook/intro.html)
- UI library: [ant design](https://ant.design/components/overview/)
- React framework: [Next.js](https://nextjs.org/docs), [React.js](https://react.dev/reference/react)
- CSS: [Tailwind CSS](https://tailwindui.com/documentation)
- JS utilities: [Lodash](https://lodash.com/docs/4.17.15)
- State management and data fetching: [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- Internationalisation: [next-intl](https://next-intl-docs.vercel.app/docs/getting-started)
