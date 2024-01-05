import "./sass/main.scss";

import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons);
// @ts-ignore
import { render } from "reefjs";

import { componentList } from "./js/components/main";
import { initStores } from "./js/stores/main";
import zafClient from "@app/zendesk/sdk";
zafClient.invoke("resize", {"height": "800px"});


render("#app", componentList());
initStores();