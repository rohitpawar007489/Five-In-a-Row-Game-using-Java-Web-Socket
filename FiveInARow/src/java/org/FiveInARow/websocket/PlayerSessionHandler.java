    
package org.FiveInARow.websocket;

import java.io.IOException;
import java.util.ArrayList;
import javax.enterprise.context.ApplicationScoped;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.JsonObject;
import javax.json.spi.JsonProvider;
import javax.websocket.Session;
import org.FiveInARow.model.Player;

/**
 *
 * @author Rohit
 */
//This is application level class responsible for handling all the users session
@ApplicationScoped
public class PlayerSessionHandler { 
    private int moveId = 0;
    private final Set<Session> sessions = new HashSet<>();
    private final Set<Player> players = new HashSet<>();
    
    //create session for user
     public void addSession(Session session) {
        sessions.add(session);
        for (Player player : players) {
            JsonObject addMessage = createAddMessage(player);
            sendToSession(session, addMessage);
        }
    }

    //remove user from session
    public void removeSession(Session session) {
        sessions.remove(session);
    }
    //retrieve connected players data
     public List<Player> getPlayers() {
        return new ArrayList<>(players);
    }

    //add players move and send it to all the user connected to session
    public void addPlayersMove(Player player) {
        player.setId(moveId);
        players.add(player);
        moveId++;
        JsonObject addMessage = createAddMessage(player);
        sendToAllConnectedSessions(addMessage);
    }
    //retrieve player information using Id
    private Player getPlayerById(int id) {
        for (Player player : players) {
            if (player.getId() == id) {
                return player;
            }
        }
        return null;
    }
    //Create session object to send to user
    private JsonObject createAddMessage(Player player) {
        JsonProvider provider = JsonProvider.provider();
        JsonObject addMessage = provider.createObjectBuilder()
                .add("action", "button_clicked")
                .add("id", player.getId())
                .add("status", player.getStatus())
                .add("coordinate",player.getCoordinate())
                .add("playername",player.getPlayerName())
                .add("colorname",player.getColorName())
                .build();
        return addMessage;
    }

    //to broadcast data to all the connected users
    private void sendToAllConnectedSessions(JsonObject message) {
        for (Session session : sessions) {
            sendToSession(session, message);
        }
    }

    //send data to particular session
    private void sendToSession(Session session, JsonObject message) {
        try {
            session.getBasicRemote().sendText(message.toString());
        } catch (IOException ex) {
            sessions.remove(session);
            Logger.getLogger(PlayerSessionHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
