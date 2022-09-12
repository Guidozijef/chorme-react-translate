import * as ReactDOMClient from 'react-dom/client';
import Content from './Content';

// 将content页面添加到body
const contentRoot = document.createElement("div");
contentRoot.id = "CRX-contentRoot";
document.body.appendChild(contentRoot);
const root = ReactDOMClient.createRoot(contentRoot);
root.render(<Content />);
