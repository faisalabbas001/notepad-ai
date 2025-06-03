// Define the document structure
interface DocItem {
    id: string;
    title: string;
    lastModified: string;
    content: string;
  }
  
  // Create the storage utility
  export const docsStorage = {
    saveDoc(doc: DocItem) {
      try {
        const docs = this.getAllDocs();
        const existingDocIndex = docs.findIndex(d => d.id === doc.id);
        
        if (existingDocIndex >= 0) {
          docs[existingDocIndex] = doc;
        } else {
          docs.push(doc);
        }
        
        localStorage.setItem('notepad-docs', JSON.stringify(docs));
      } catch (error) {
        console.error('Error saving doc:', error);
      }
    },
  
    getAllDocs(): DocItem[] {
      try {
        const docs = localStorage.getItem('notepad-docs');
        return docs ? JSON.parse(docs) : [];
      } catch (error) {
        console.error('Error getting docs:', error);
        return [];
      }
    },
  
    getDoc(id: string): DocItem | null {
      try {
        const docs = this.getAllDocs();
        return docs.find(doc => doc.id === id) || null;
      } catch (error) {
        console.error('Error getting doc:', error);
        return null;
      }
    },
  
    deleteDoc(id: string) {
      try {
        const docs = this.getAllDocs().filter(doc => doc.id !== id);
        localStorage.setItem('notepad-docs', JSON.stringify(docs));
      } catch (error) {
        console.error('Error deleting doc:', error);
      }
    }
  };