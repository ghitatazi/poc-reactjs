import AppDispatcher from '../dispatcher/Dispatcher';
import { ActionConstants } from '../constants/actions/ActionConstants';


export function getTimeSerie() {
  AppDispatcher.handleViewAction({
    actionType: ActionConstants.GET_SERIE,
  });
}

export function getFeeds() {
  AppDispatcher.handleViewAction({
    actionType: ActionConstants.GET_FEEDS,
  });
}

export function getDatapoints() {
  AppDispatcher.handleViewAction({
    actionType: ActionConstants.GET_DATAPOINTS,
  });
}

export function getInstantVal() {
  AppDispatcher.handleViewAction({
    actionType: ActionConstants.GET_INSTANT_VAL,
  });
}

