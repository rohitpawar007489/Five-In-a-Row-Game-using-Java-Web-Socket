package org.FiveInARow.websocket;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.StringReader;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import org.FiveInARow.model.Player;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Rohit
 */
//Websocket server is responsible for all the users request 
@ApplicationScoped
@ServerEndpoint("/actions") //url to access web socket server request
public class PlayerWebSocketServer {
    @Inject
    private PlayerSessionHandler sessionHandler;
   
    //perform action upon opening a websocket
    @OnOpen
        public void open(Session session) {
            sessionHandler.addSession(session);
    }
    
     //perform action while closing a websocket
    @OnClose
        public void close(Session session) {
            sessionHandler.removeSession(session);
    }

    //perform action upon error occured during a websocket
    @OnError
        public void onError(Throwable error) {
            Logger.getLogger(PlayerWebSocketServer.class.getName()).log(Level.SEVERE, null, error);
    }

     //perform action upon receiving a message from user over websocket
    @OnMessage
        public void handleMessage(String message, Session session) {
            try (JsonReader reader = Json.createReader(new StringReader(message))) {
            JsonObject jsonMessage = reader.readObject();

            if ("button_clicked".equals(jsonMessage.getString("action"))) {
                Player player = new Player();
                player.setCoordinate(jsonMessage.getString("coordinate"));
                player.setPlayerName(jsonMessage.getString("playername"));
                player.setColorName(jsonMessage.getString("colorname"));
                player.setStatus("Off");
                sessionHandler.addPlayersMove(player);
            }
        }
    }
}
