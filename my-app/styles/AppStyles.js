import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#cfe8d2",
    // alignContent: "center",
  },

  listWrapper: {
    paddingTop: 30,
    paddingHorizontal: 10,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 10,
    marginTop: 30,
    color: "#054a0c",
    // borderWidth: 2,
  },

  items: {
    marginTop: 30,
    width: 380,
  },

  sendButton: {
    backgroundColor: "#3bb34d",
    width: 150,
    alignItems: "center",
    paddingHorizontal: 10,
    // marginLeft: 30,
    // bottom:90,
    // marginTop: 500,
    height: 80,
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#156e1f",
  },
  sendButtonText: {
    color: "#054a0c",
    fontWeight: "500",
    fontSize: 17,
  },
  searchWrapper: {
    position: "absolute",
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 100,
  },

  inputbox: {
    padding: 15,
    height: 50,
    marginHorizontal: 12,
    borderRadius: 10,
    width: 300,
    backgroundColor: "#edf7ef",
    borderColor: "#97d19e",
    borderWidth: 2,
    fontSize: 17,
  },

  addItemWrapper: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3bb34d",
    borderColor: "#156e1f",
  },
  addItem: {
    fontSize: 30,
    color: "#156e1f",
  },
  container: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    left: 5,
    right: 5,
    top: -50,
    bottom: 5,
    position: "absolute",
    // height: 1000,
    // width: 300
  },
  dropdownOptions: {
    marginLeft: 12,
    flexShrink: 1,
    width: 300,
    borderWidth: 1,
    padding: 5,
    height: 50,
    marginLeft: 13,
    backgroundColor: "#a5d4ab",
    borderRadius: 5,
    borderTopWidth: 0,
    borderColor: "#156e1f",
    elevation: 2,
    opacity: 1,
  },
  groceryList: {
    // borderWidth: 2,
    // borderColor: "pink",
    position: "absolute",
    top: 0,
    bottom: 100,
  },
  listAndButton: {
    position: "absolute",
    top: 60,
    left: 0,
    bottom: 10,
    right: 0,
    zIndex: -90,
    // borderWidth: 5,
  },
  sendButtonPosition: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    justifyContent: "space-around",
  },
});

export default styles;
