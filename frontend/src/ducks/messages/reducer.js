import types from './types';
import * as mqtt from 'mqtt/dist/mqtt';

export const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_MESSAGES_SUCCESS:
      return action.payload;
    case types.GET_MESSAGES_FAILURE:
      return [];
    case types.SEND_MESSAGE_SUCCESS:
      const client = mqtt.connect('mqtt://localhost:8000/mqtt');
      client.publish(
        `message/${action.payload.name}`,
        JSON.stringify(action.payload)
      );
      return [...state, action.payload];
    case types.RECEIVE_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
};
