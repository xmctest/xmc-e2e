// import React from 'react';
// import * as FEAAS from '@sitecore-feaas/clientside/react';

// interface MyComponentProps {
//   title: string;
//   columnsCount: number;
// }

// export const MyComponent = (props: MyComponentProps): React.JSX.Element => {
//   const columns: string[] = [];
//   for (let i = 0; i < props.columnsCount; i++) {
//     columns.push(`Component Column ${i + 1}`);
//   }
//   return (
//     <div className="container">
//       <h2>{props.title || 'BYOC Demo'}</h2>
//       <p>MyComponent Component</p>
//       <div className="row">
//         {columns.map((text, index) => (
//           <div key={index} className={`col-sm-${props.columnsCount}`}>
//             {text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// FEAAS.External.registerComponent(MyComponent, {
//   name: 'MyComponent',
//   properties: {
//     title: {
//       type: 'string',
//     },
//     columnsCount: {
//       type: 'number',
//     },
//   },
// });
import { TextField } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { Text } from "@sitecore-content-sdk/nextjs";
interface MyComponent extends ComponentProps {
  fields: {
    Quote: TextField;
  };
}
export default function Default({ fields }: MyComponent) {
  const { Quote } = fields;
  return (
    <>
      <Text field={Quote} />
    </>
  );
}