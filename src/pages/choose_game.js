import React, { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const settings = [
  {
    name: "Tic Tac Toe",
    route: "/tic-tac/",
  },
  {
    name: "Sea Battle",
    route: "/game/",
  },
];

function Choose_game() {
  const navigate = useNavigate();

  const [gameId, setGameId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(settings[0]);
  useEffect(() => {
    setGameId(Date.now());
  }, []);
  const onJoin = () => {
    if (inputValue[1] === "t") {
      navigate("/tic-tac/" + inputValue);
    } else {
      navigate("/game/" + inputValue);
    }
  };
  const onSubmit = () => {
    const selectedGame = settings.find((game) => game.name === selected.name);
    const route = selectedGame.route;
    const prefix = () => {
      if (selectedGame.name === "Tic Tac Toe") {
        return "ttt";
      } else {
        return "sb";
      }
    };
    navigate(route + prefix() + gameId);
  };
  return (
    <div className="flex-col flex items-center justify-center md:flex-row">
      <div className="overflow-hidden px-5 w-1/2 md:w-1/3 bg-gray-700 shadow rounded-lg">
        <h2 className="my-10 text-2xl text-white ">Choose your game!</h2>
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">
            Privacy setting
          </RadioGroup.Label>
          <div className="-space-y-px rounded-md">
            {settings.map((setting, settingIdx) => (
              <RadioGroup.Option
                key={setting.name}
                value={setting}
                className={({ checked }) =>
                  classNames(
                    settingIdx === 0 ? "rounded-md mb-3 bg-white" : "",
                    settingIdx === settings.length - 1
                      ? "rounded-md bg-white"
                      : "",
                    checked
                      ? "z-10 border-gray-200 bg-gray-50"
                      : "border-gray-200",
                    "relative flex cursor-pointer border p-4 focus:outline-none"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span
                      className={classNames(
                        checked
                          ? "bg-gray-600 border-transparent"
                          : "bg-white border-gray-300",
                        active ? "ring-2 ring-offset-2 ring-gray-600" : "",
                        "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                      )}
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <span className="ml-3 flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className={classNames(
                          checked ? "text-gray-900" : "text-gray-900",
                          "block text-sm font-medium"
                        )}
                      >
                        {setting.name}
                      </RadioGroup.Label>
                    </span>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <button
          onClick={onSubmit}
          type="button"
          className="my-10 w-full rounded-md bg-gray-500 py-1 px-2 text-s font-semibold text-white shadow-sm hover:bg-gray-600 focus:ring-2 focus:ring-offset-1 focus:ring-gray-200 "
        >
          I'm ready!
        </button>
      </div>
      <div><h1 className="mx-10 mt-3 text-md">or</h1></div>
      <div className="mt-5 w-1/2 md:w-1/3 bg-gray-700 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-white">
            Connect by Game ID
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Enter the id of the game you want to join </p>
          </div>
          <form className="mt-5 max-w-xl sm:flex sm:items-center justify-center">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="gameId" className="sr-only">
                GameId
              </label>
              <input
                type="text"
                name="GameId"
                id="id"
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                placeholder="1234567890"
              />
            </div>
            <button
              type="button"
              onClick={onJoin}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100 sm:ml-3 sm:mt-0 sm:w-auto"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Choose_game;