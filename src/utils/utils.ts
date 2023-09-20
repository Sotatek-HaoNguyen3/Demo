import { RootParamList } from 'stacks/types';
import Storages, { KeyStorage } from './storages';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const getInitRoute = async (user) => {
    let screenName: keyof RootParamList = 'Intro';
    const isTurnOfIntro = await Storages.get(KeyStorage.isTurnOfIntro);
    if (user) {
        screenName = 'Main';
    } else {
        if (isTurnOfIntro) {
            screenName = 'Login';
        }
    }
    return screenName;
};
export { sleep, getInitRoute };
