import AppDispatcher from '../dispatcher/Dispatcher';
import { ActionConstants } from '../constants/actions/ActionConstants';
import { EventEmitter } from 'events';
import { flotChartSerie } from '../constants/models/TimeSeriesModel';
import dataFormatterFn from '../processors/SerieFormatter';
import feedsFormatterFn from '../processors/FeedsFormatter';

const CHANGE_EVENT = 'change';

const store = { serie: [] };
const feeds = { feeds: [] };
const datapoints = { values: [] };
let instantVal = [];


// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve the store
class TimeSerieStoreClass extends EventEmitter {

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getSerie() {
    return store;
  }

  getFeeds() {
    return feeds;
  }

  getDatapoints() {
    return datapoints;
  }

  getLastValue() {
    return instantVal;
  }
}

// Init the singleton to register with the dispatcher and export for React components
const TimeSerieStore = new TimeSerieStoreClass();

function ajaxGetRequest(urlResource, structure, transformDataFn) {
  $.ajax({
    url: urlResource,
    type: 'GET',
    success(data) {
      let dataArr = $.makeArray(data);
      if (transformDataFn !== null) {
        dataArr = transformDataFn(dataArr);
      }
      structure.push(dataArr);
      TimeSerieStore.emit(CHANGE_EVENT);
    },
    error(XMLHttpRequest, textStatus, errorThrown) {
      console.log(`Error when GET feeds: ${errorThrown}`);
    },
  });
}

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a change
AppDispatcher.register((payload) => {
  const action = payload.action;
  let urlResource = '';
  switch (action.actionType) {
    case ActionConstants.GET_SERIE:
      store.serie.push(dataFormatterFn(flotChartSerie));
      break;
    case ActionConstants.GET_FEEDS:
      $.ajax({
        url: '/api/v1/feeds/',
        type: 'GET',
        success(data) {
          let dataArr = $.makeArray(data);
          dataArr = feedsFormatterFn(dataArr);
          dataArr.forEach(v => {
            feeds.feeds.push(v);
          });
          TimeSerieStore.emit(CHANGE_EVENT);
        },
        error(XMLHttpRequest, textStatus, errorThrown) {
          console.log(`Error when GET feeds: ${errorThrown}`);
        },
      });
      break;
    case ActionConstants.GET_DATAPOINTS:
      urlResource = '/api/v1/datapoints/?feed=1&ts_min=1464194458&ts_max=';
      ajaxGetRequest(urlResource, datapoints.values, null);
      break;
    case ActionConstants.GET_INSTANT_VAL:
      // For now, get last value for feed 1
      $.ajax({
        url: '/api/v1/feeds/1/last',
        type: 'GET',
        success(data) {
          const dataArr = $.makeArray(data);
          instantVal = [dataArr];
          TimeSerieStore.emit(CHANGE_EVENT);
        },
        error(XMLHttpRequest, textStatus, errorThrown) {
          console.log(`Error when GET feeds: ${errorThrown}`);
        },
      });
      break;
    default:
      break;
  }
  return true;
});

export default TimeSerieStore;
