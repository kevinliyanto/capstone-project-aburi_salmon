from flask import request, jsonify
from flask_restx import Resource, abort, reqparse, fields
from flask_jwt_extended import get_jwt_claims, jwt_required

from app import api, db
from model.request_model import edit_staff_model, delete_staff_model

staff_profile = api.namespace('staff_profile', description='Staff''s Profile Route')

@staff_profile.route('/staff_list')
class Staff_list(Resource):
    #@jwt_required
    @staff_profile.response(200, 'Success')
    @staff_profile.response(400, 'Invalid request')
    def get(self):
        staff_list = db.get_all_staff()
        return { 'staff_list': staff_list }

@staff_profile.route('/edit')
class Staff_edit(Resource):
    #@jwt_required
    @staff_profile.expect(edit_staff_model)
    @staff_profile.response(200, 'Success')
    @staff_profile.response(400, 'Invalid request')
    def patch(self):

        edit_staff_input = request.get_json()
        staff_id = edit_staff_input.get('staff_id')
        name_new = edit_staff_input.get('name')
        username_new = edit_staff_input.get('username')
        staff_type_id_new = edit_staff_input.get('staff_type_id')

        staff_curr = db.get_staff_detail(staff_id)
        curr_name = staff_curr['name']
        curr_username = staff_curr['username']
        curr_staff_type_id = staff_curr['staff_type']

        print("INPUT")
        print(staff_id)
        print(name_new)
        print(username_new)
        print(staff_type_id_new)

        print("PREV/CURRENT")
        print(curr_name)
        print(curr_username)
        print(curr_staff_type_id)

        if staff_id == 0:
            abort(400, 'Please insert a staff id.')

        if name_new == 'string':
            name = curr_name
        else:
            name = name_new

        if username_new == 'string':
            username = curr_username
        else:
            username = username_new
        
        if staff_type_id_new == 0:
            staff_type = curr_staff_type_id
        else:
            staff_type = staff_type_id_new

        print("YG MAU DIMODIFY")
        print(staff_id)
        print(name)
        print(username)
        print(staff_type)
        
        edit = db.modify_staff(staff_id, name, username, staff_type)
        if edit != 1:
            abort(400, 'Something is wrong.')
        
        response = jsonify({
            'status': 'success'
        })


#delete_staff_model = api.model('delete_staff_model', {
#    "staff_id": fields.Integer(description="staff_id")
#})
    


#edit
#delete
