import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
// components
import Main from "./components/Main";
import EditorView from "./views/EditorView";
import PlaygroundView from "./views/PlaygroundView";
import ImageInspectorView from "./views/ImageInspectorView";
import DragView from "./views/DragView";

export const history = createBrowserHistory();

function App() {
	return (
		<Router history={history}>
			<div className="App">
				<Main>
					<Switch>
						<Route exact path="/" component={EditorView} />
						<Route path="/play" component={PlaygroundView} />
						<Route path="/inspect" component={ImageInspectorView} />
						<Route path="/drag" component={DragView} />
					</Switch>
				</Main>
			</div>
		</Router>
	);
}

export default App;
