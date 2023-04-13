import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#E8EAED",
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
    // borderWidth: 2,
  },

  items: {
    marginTop: 30,
    width: 380,
  },

  exportButton: {
    backgroundColor: "#4abf0f",
    width: 150,
    alignItems: "center",
    paddingHorizontal: 10,
    // marginLeft: 30,
    // bottom:90,
    // marginTop: 500,
    height: 100,
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    // borderColor: "red",
  },
  searchWrapper: {
    position: "absolute",
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  inputbox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#999",
    borderColor: "black",
    borderWidth: 1,
    width: 290,
    borderRadius: 40,
    // marginBottom
  },
  addItemWrapper: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4abf0f",
  },
  addItem: {
    // backgroundColor:''
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
});

export default styles;
