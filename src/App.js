import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
// components
import Main from "./components/Main";
import EditorView from "./views/EditorView";
import PlaygroundView from "./views/PlaygroundView";
import ImageInspectorView from "./views/ImageInspectorView";

export const history = createBrowserHistory();

function App() {
	return (
		<Router history={history}>
			<div className="App">
				<Main>
					<Switch>
						<Route exact path="/" component={EditorView} />
						<Route exact path="/play" component={PlaygroundView} />
						<Route exact path="/inspect" component={ImageInspectorView} />
					</Switch>
				</Main>
			</div>
		</Router>
	);
}

export default App;
