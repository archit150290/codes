<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\Routing\Router;
/**
 * Articles Model
 *
 * @method \App\Model\Entity\Article get($primaryKey, $options = [])
 * @method \App\Model\Entity\Article newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Article[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Article|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Article patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Article[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Article findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class ArticlesTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('articles');
        $this->setDisplayField('title');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');
        // Just add the belongsTo relation with CategoriesTable
        $this->belongsTo('Categories', [
            'foreignKey' => 'category_id',
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {   

        $action = Router::getRequest()->params['action'];
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->scalar('title')
            ->maxLength('title', 50)
            ->notEmpty('title');

        $validator
            ->scalar('body')
            ->notEmpty('body');

        if($action!="edit"){
            $validator
        ->add('image', [

            'uploadError' => [
                    'rule' => 'uploadError',
                    'message' => 'The cover image upload failed.'
            ],
            'fileSize' => [
                    'rule' => [
                        'fileSize', '<', '5MB'
                    ],
                    'message' => 'Please upload file smaller than 5MB',
                    'last' => true

                ],
            'mimeType' => [
                'rule' => [
                    'mimeType', ['image/jpeg','image/png','image/jpg']
                ],
                'message' => 'Please upload only png images'
            ]
        ])
        ->requirePresence('image', 'create')
        ->notEmpty('image');
        }else{

        
        $validator
        ->add('image', [

            'uploadError' => [
                    'rule' => 'uploadError',
                    'message' => 'The cover image upload failed.'
            ],
            'fileSize' => [
                    'rule' => [
                        'fileSize', '<', '5MB'
                    ],
                    'message' => 'Please upload file smaller than 5MB',
                    'last' => true

                ],
            'mimeType' => [
                'rule' => [
                    'mimeType', ['image/jpeg','image/png','image/jpg']
                ],
                'message' => 'Please upload only png images'
            ]
        ])
        ->requirePresence('image', 'create')
        ->allowEmpty('image');

        }
        /* $validator
            ->add('image', [

                'uploadError' => [
                        'rule' => 'uploadError',
                        'message' => 'The cover image upload failed.',
                        'allowEmpty' => TRUE,
                        'last' => true
                ],

                'mimeType' => [
                        'rule' => array('mimeType', array('image/gif', 'image/png', 'image/jpg', 'image/jpeg')),
                        'message' => 'Please only upload images (gif, png, jpg).',
                        'allowEmpty' => TRUE,
                        'last' => true
                ],

                'fileSize' => [
                        'rule' => array('fileSize', '<=', '1MB'),
                        'message' => 'Cover image must be less than 1MB.',
                        'allowEmpty' => TRUE,
                        'last' => true
                ],

                'processCoverUpload' => [
                        'rule' => 'processCoverUpload',
                        'message' => 'Unable to process cover image upload.',
                        'allowEmpty' => TRUE,
                        'last' => true
                ],

            ]); */

        return $validator;
    }
}
