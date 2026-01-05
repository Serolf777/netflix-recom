import { StyleSheet, Dimensions } from 'react-native';

const windowsHeight = Dimensions.get('window').height;

export const mainPageStyles = StyleSheet.create({
  mainPageContainer: {
    height: "100%", 
    display: "flex", 
    flexDirection: "column",
    minHeight: windowsHeight
  },
  siteBody: {
    marginTop: 60, 
    paddingBottom: 12, 
    flex: 1
  },
  announcement: {
    fontSize: 20, 
    color: "red", 
    fontWeight: "bold"
  },
  stockDataNote: {
    marginBottom: 4, 
    fontSize: 14, 
    color: "black", 
    fontWeight: "bold", 
    fontStyle: "italic"
  },
  netflixShowsContainer: {
    display: "flex", 
    alignItems: "center", 
    maxWidth: 1366, 
    marginTop: 0, 
    marginBottom: 0, 
    marginLeft: "auto", 
    marginRight: "auto"
  },
  netFlixShowsList: {
    display: "flex", 
    flexWrap: "wrap", 
    justifyContent: "center"
  },
  errorMsg: {
    fontSize: 14, 
    color: "red"
  },
  aiSearchSection: {
    display: "flex", 
    flexDirection: "row"
  },
  searchHeader: {
    minWidth: "auto", 
    textAlign: "right", 
    marginTop: 24, 
    marginBottom: 10, 
    marginRight: 16, 
    color: "blue", 
    fontWeight: "bold", 
    fontSize: 16, 
    flexGrow: 3, 
    flexShrink: 1
  },
  buttonContainer: {
    minWidth: "auto", 
    flex: 2, 
    display: "flex", 
    alignItems: "flex-end", 
    marginBottom: 8, 
    marginRight: 8, 
    justifyContent: "center"
  },
  searchBy: {
    flexDirection:'row', 
    flexWrap:'wrap'
  },
  searchbar: {
    minWidth: "auto", 
    marginRight: 10
  },
  submitButtonContainer: {
    marginLeft: "33%", 
    width: "33%", 
    marginBottom: 8, 
    justifyContent: "center"
  }
});