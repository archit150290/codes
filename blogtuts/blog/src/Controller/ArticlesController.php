<?php
namespace App\Controller;
use Cake\Filesystem\Folder;
use Cake\Filesystem\File;

use App\Controller\AppController;

/**
 * Articles Controller
 *
 * @property \App\Model\Table\ArticlesTable $Articles
 *
 * @method \App\Model\Entity\Article[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ArticlesController extends AppController
{   
   

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $articles = $this->Articles->find()
                ->order(['created' => 'DESC']);
        $this->paginate = [
            'limit' => 5
        ];
        $articles = $this->paginate($articles);
        
        $this->set(compact('articles'));
    }

    /**
     * View method
     *
     * @param string|null $id Article id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $article = $this->Articles->get($id, [
            'contain' => []
        ]);
        

        $this->set('article', $article);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $article = $this->Articles->newEntity();
        if ($this->request->is('post')) {
            
            $article = $this->Articles->patchEntity($article, $this->request->getData());
            //$imageName = $this->request->data['image']['name'];
            $file = $this->request->data['image'];
            
            $file['name'] =  time() . '-' . str_replace(' ', '_', $file['name']); 
            echo WWW_ROOT . 'files';
            $dir = new Folder(WWW_ROOT . 'files', true, 0777);
            if(move_uploaded_file($file['tmp_name'], WWW_ROOT . 'files/' . $file['name'])){
                //$this->request->data['image'] = $file['name'];
                $article->image = $file['name'];
                if ($this->Articles->save($article)) {
                    $this->Flash->success(__('The article has been saved.'));
                    return $this->redirect(['action' => 'index']);
                }
            }
            $this->Flash->error(__('The article could not be saved. Please, try again.'));
        }
        
        // Just added the categories list to be able to choose
        // one category for an article
        $categories = $this->Articles->Categories->find('treeList');
        $this->set(compact('categories', 'article'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Article id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $article = $this->Articles->get($id, [
            'contain' => []
        ]);

        $articleImage = $article->image;
        if ($this->request->is(['patch', 'post', 'put'])) {
            $article = $this->Articles->patchEntity($article, $this->request->getData());
            $file = $this->request->data['image'];
            
            if($file["size"] > 0){
                $file['name'] =  time() . '-' . str_replace(' ', '_', $file['name']);
                move_uploaded_file($file['tmp_name'], WWW_ROOT . 'files/' . $file['name']);
                $article->image = $file['name'];
                $filePath = WWW_ROOT . 'files/'.$articleImage;
                //echo file_exists(WWW_ROOT . 'files/'.$article->image);exit();
                if(file_exists(WWW_ROOT . 'files/'.$articleImage)){
                    unlink($filePath);
                }
            }else{
                $article->image = $articleImage;
            }
            
            if ($this->Articles->save($article)) {
                $this->Flash->success(__('The article has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The article could not be saved. Please, try again.'));
        }
        
        $categories = $this->Articles->Categories->find('treeList');
        $this->set(compact('article', 'categories'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Article id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $article = $this->Articles->get($id);
        //$file = new File(WWW_ROOT . 'files/'.$article->image, false, 0777);
        $filePath = WWW_ROOT . 'files/'.$article->image;
        //echo file_exists(WWW_ROOT . 'files/'.$article->image);exit();
        if(file_exists(WWW_ROOT . 'files/'.$article->image)){
            unlink($filePath);
        }
        
        if ($this->Articles->delete($article)) {
            $this->Flash->success(__('The article has been deleted.'));
        } else {
            $this->Flash->error(__('The article could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
