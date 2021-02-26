import { useCallback, useState, useEffect } from "react";

const getKeyMap = (targetKeys = []) => {
	return targetKeys.reduce((keyMap, key) => {
		if (!keyMap[key.toLowerCase()]) {
			keyMap[key.toLowerCase()] = false;
			return keyMap;
		}
		return keyMap;
	}, {});
};

const getFiredState = (shortcutKeys, keyState) => {
	return shortcutKeys.every((key) => keyState[key]);
};

// elements to be EXEMPT from event handler(s) to
const blacklistedTargets = ["INPUT", "TEXTAREA"];

const useKeyboardShortcut = (targetKeys = []) => {
	// individual key's state (ie shift: false, /: true)
	// whether both were fired
	const [wasPressed, setWasPressed] = useState(false);
	const [keys, setKeys] = useState({
		...getKeyMap(targetKeys),
	});

	// keydown handler
	const handleKeyDown = useCallback(
		(keydownEvent) => {
			const { key, target, repeat } = keydownEvent;
			const loweredKey = key.toLowerCase();

			if (repeat) return;
			if (blacklistedTargets.includes(target.tagName)) return;
			if (keys[loweredKey] === undefined) return;

			if (keys[loweredKey] === false) {
				setKeys({
					...keys,
					[loweredKey]: true,
				});
				setWasPressed(getFiredState(targetKeys, keys));
			}
		},
		[keys, targetKeys]
	);
	// keyup event handler
	const handleKeyUp = useCallback(
		(keyupEvent) => {
			const { key, target, repeat } = keyupEvent;
			const loweredKey = key.toLowerCase();

			if (repeat) return;
			if (blacklistedTargets.includes(target.tagName)) return;
			if (keys[loweredKey] === undefined) return;

			if (keys[loweredKey] === true) {
				setKeys({
					...keys,
					[loweredKey]: false,
				});
				setWasPressed(getFiredState(targetKeys, keys));
			}
		},
		[keys, targetKeys]
	);

	// sets 'wasFired' state
	// checks that ALL keys are NOT 'false'
	useEffect(() => {
		if (!Object.values(keys).filter((value) => !value).length) {
			setWasPressed(true);
		}
	}, [keys]);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown, true);
		return () => window.removeEventListener("keydown", handleKeyDown, true);
	}, [handleKeyDown]);

	useEffect(() => {
		window.addEventListener("keyup", handleKeyUp, true);
		return () => window.removeEventListener("keyup", handleKeyUp, true);
	}, [handleKeyUp]);

	return wasPressed;
};

export { useKeyboardShortcut };
