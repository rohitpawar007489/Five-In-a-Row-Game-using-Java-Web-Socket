
package org.FiveInARow.model;

/**
 *
 * @author Rohit
 */
//Player is entity class which holds all the attributes of player and it provides getter and setter method to set those value
public class Player {
    private int id;
    private String action;
    private String status;
    private String coordinate;
    private String playername;
    private String colorname;
    
    public Player() {
    }
    
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public String getAction() {
        return action;
    }
    
    public void setAction(String action) {
        this.action = action;
    }

    public String getPlayerName() {
        return playername;
    }
    
    public void setPlayerName(String playername) {
        this.playername = playername;
    }

    public String getColorName() {
        return colorname;
    }
    
    public void setColorName(String colorname) {
        this.colorname = colorname;
    }

    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }

    public void setCoordinate(String coordinate) {
        this.coordinate = coordinate;
    }
    public String getCoordinate() {
        return coordinate;
    }
}
